import psutil
import subprocess
import requests
import datetime
import socket
from pathlib import Path
from config import PROJECT_URL, CRITICAL_SERVICES, CPU_THRESHOLD, RAM_THRESHOLD, DISK_THRESHOLD

def get_hostname():
    """Récupère le nom d'hôte (hostname) du serveur."""
    try:
        return socket.gethostname()
    except Exception:
        return "Serveur-Linux"

def get_cpu_load():
    """Récupère la charge CPU moyenne (1m, 5m, 15m) et le pourcentage global."""
    try:
        load1, load5, load15 = psutil.getloadavg()
        load_str = f"{load1:.2f}  {load5:.2f}  {load15:.2f}"
    except Exception:
        load_str = "N/A"
    
    cpu_percent = psutil.cpu_percent(interval=1)
    return cpu_percent, load_str

def get_system_resources():
    """Récupère les ressources détaillées (CPU, RAM, Disque, Uptime) comme sur la capture."""
    hostname = get_hostname()
    cpu_percent, cpu_load_str = get_cpu_load()
    
    # RAM
    memory = psutil.virtual_memory()
    ram_used_gi = round(memory.used / (1024 ** 3), 2)
    ram_total_gi = round(memory.total / (1024 ** 3), 2)
    ram_percent = memory.percent

    # Disque (/)
    disk = psutil.disk_usage('/')
    disk_used_gi = round(disk.used / (1024 ** 3), 2)
    disk_total_gi = round(disk.total / (1024 ** 3), 2)
    disk_percent = disk.percent

    # Uptime
    boot_time = datetime.datetime.fromtimestamp(psutil.boot_time())
    uptime_duration = datetime.datetime.now() - boot_time
    days = uptime_duration.days
    hours, remainder = divmod(uptime_duration.seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    
    uptime_parts = []
    if days > 0:
        uptime_parts.append(f"{days} jour(s)")
    uptime_parts.append(f"{hours}h {minutes}m")
    uptime_str = ", ".join(uptime_parts)

    return {
        "hostname": hostname,
        "uptime": uptime_str,
        "cpu_percent": cpu_percent,
        "cpu_load": cpu_load_str,
        "ram_used_gi": ram_used_gi,
        "ram_total_gi": ram_total_gi,
        "ram_percent": ram_percent,
        "disk_used_gi": disk_used_gi,
        "disk_total_gi": disk_total_gi,
        "disk_percent": disk_percent
    }

def check_service_status(service_name):
    """Vérifie si un service systemd est actif sur le serveur."""
    try:
        cmd = ["systemctl", "is-active", service_name]
        result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=5)
        return result.stdout.strip() == "active"
    except Exception:
        return False

def check_all_services():
    """Vérifie l'état de tous les services critiques."""
    statuses = {}
    for service in CRITICAL_SERVICES:
        statuses[service] = check_service_status(service)
    return statuses

def check_website_health(url=PROJECT_URL):
    """Vérifie si le site portfolio répond correctement."""
    try:
        response = requests.get(url, timeout=10, headers={"User-Agent": "TelegramServerSupervisor/1.0"})
        is_up = (200 <= response.status_code < 400)
        return {
            "is_up": is_up,
            "status_code": response.status_code,
            "response_time_ms": round(response.elapsed.total_seconds() * 1000, 2)
        }
    except Exception as e:
        return {
            "is_up": False,
            "status_code": None,
            "error": str(e)
        }

def evaluate_alerts():
    """Évalue les seuils critiques pour déclencher des alertes."""
    res = get_system_resources()
    alerts = []

    if res["cpu_percent"] >= CPU_THRESHOLD:
        alerts.append(f"⚙️ **Charge CPU Élevée** : {res['cpu_percent']}% (Seuil: {CPU_THRESHOLD}%)")

    if res["ram_percent"] >= RAM_THRESHOLD:
        alerts.append(f"🧠 **RAM Saturee** : {res['ram_percent']}% ({res['ram_used_gi']}Gi / {res['ram_total_gi']}Gi)")

    if res["disk_percent"] >= DISK_THRESHOLD:
        alerts.append(f"💾 **Disque Presque Plein** : {res['disk_percent']}% ({res['disk_used_gi']}Gi / {res['disk_total_gi']}Gi)")

    services = check_all_services()
    for srv, is_active in services.items():
        if not is_active:
            alerts.append(f"🔴 **Service Arrêté** : `{srv}` ne répond plus !")

    site = check_website_health()
    if not site["is_up"]:
        err_info = f"HTTP {site['status_code']}" if site['status_code'] else site.get('error', 'Inaccessible')
        alerts.append(f"🌐 **Portfolio Indisponible** : `{PROJECT_URL}` ({err_info})")

    return alerts, res
