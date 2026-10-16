import psutil
import subprocess
import requests
import datetime
import socket
import html
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
        load_str = f"{load1:.2f}, {load5:.2f}, {load15:.2f}"
    except Exception:
        load_str = "N/A"
    
    cpu_percent = psutil.cpu_percent(interval=0.5)
    return cpu_percent, load_str

def get_system_resources():
    """Récupère les ressources détaillées (CPU, RAM, Swap, Disque, Uptime)."""
    hostname = get_hostname()
    cpu_percent, cpu_load_str = get_cpu_load()
    
    # RAM
    memory = psutil.virtual_memory()
    ram_used_gi = round(memory.used / (1024 ** 3), 2)
    ram_total_gi = round(memory.total / (1024 ** 3), 2)
    ram_percent = memory.percent

    # Swap
    swap = psutil.swap_memory()
    swap_used_gi = round(swap.used / (1024 ** 3), 2)
    swap_total_gi = round(swap.total / (1024 ** 3), 2)
    swap_percent = swap.percent

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
        uptime_parts.append(f"{days}j")
    uptime_parts.append(f"{hours}h {minutes}m")
    uptime_str = " ".join(uptime_parts)

    return {
        "hostname": hostname,
        "uptime": uptime_str,
        "cpu_percent": cpu_percent,
        "cpu_load": cpu_load_str,
        "ram_used_gi": ram_used_gi,
        "ram_total_gi": ram_total_gi,
        "ram_percent": ram_percent,
        "swap_used_gi": swap_used_gi,
        "swap_total_gi": swap_total_gi,
        "swap_percent": swap_percent,
        "disk_used_gi": disk_used_gi,
        "disk_total_gi": disk_total_gi,
        "disk_percent": disk_percent
    }

def get_top_processes(sort_by="cpu", limit=5):
    """
    Retourne les N processus les plus gourmands (triés par 'cpu' ou 'mem').
    """
    processes = []
    for proc in psutil.process_iter(['pid', 'name', 'username', 'cpu_percent', 'memory_percent']):
        try:
            pinfo = proc.info
            processes.append({
                'pid': pinfo['pid'],
                'name': pinfo['name'] or "unknown",
                'user': pinfo['username'] or "root",
                'cpu': pinfo['cpu_percent'] or 0.0,
                'mem': round(pinfo['memory_percent'] or 0.0, 1)
            })
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            pass

    key_name = 'cpu' if sort_by == 'cpu' else 'mem'
    sorted_procs = sorted(processes, key=lambda p: p[key_name], reverse=True)[:limit]

    lines = []
    for p in sorted_procs:
        lines.append(f"• PID <code>{p['pid']}</code> [{p['name']}] | CPU: <b>{p['cpu']}%</b> | RAM: <b>{p['mem']}%</b> ({p['user']})")

    return "\n".join(lines) if lines else "Aucun processus disponible."

def check_service_status(service_name):
    """Vérifie si un service systemd est actif sur le serveur."""
    try:
        cmd = ["systemctl", "is-active", service_name]
        result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=5)
        return result.stdout.strip() == "active"
    except Exception:
        return False

def check_all_services():
    """Vérifie l'état de tous les services configurés."""
    statuses = {}
    for service in CRITICAL_SERVICES:
        statuses[service] = check_service_status(service)
    return statuses

def check_website_health(url=PROJECT_URL):
    """Vérifie si le site web portfolio répond correctement."""
    try:
        response = requests.get(url, timeout=8, headers={"User-Agent": "VPS-TelegramSupervisor/2.0"})
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
        alerts.append(f"⚙️ <b>Charge CPU Critique</b> : {res['cpu_percent']}% (Seuil: {CPU_THRESHOLD}%)")

    if res["ram_percent"] >= RAM_THRESHOLD:
        alerts.append(f"🧠 <b>RAM Saturée</b> : {res['ram_percent']}% ({res['ram_used_gi']}Gi / {res['ram_total_gi']}Gi)")

    if res["disk_percent"] >= DISK_THRESHOLD:
        alerts.append(f"💾 <b>Espace Disque Critique</b> : {res['disk_percent']}% ({res['disk_used_gi']}Gi / {res['disk_total_gi']}Gi)")

    services = check_all_services()
    for srv, is_active in services.items():
        if not is_active:
            alerts.append(f"🔴 <b>Service Arrêté</b> : <code>{srv}</code> est inactif !")

    site = check_website_health()
    if not site["is_up"]:
        err_info = f"HTTP {site['status_code']}" if site['status_code'] else site.get('error', 'Inaccessible')
        alerts.append(f"🌐 <b>Site Portfolio Inaccessible</b> : {PROJECT_URL} ({err_info})")

    return alerts, res
