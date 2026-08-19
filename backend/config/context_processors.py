from django.apps import apps
from django.contrib.admin.models import LogEntry
from django.db.models import Count


def admin_metrics(request):
    if not request.path.startswith('/admin/'):
        return {}

    app_counts = []
    total_records = 0
    for config in apps.get_app_configs():
        if config.name.startswith('django.') or config.name in {'rest_framework', 'corsheaders', 'solo'}:
            continue
        model_count = 0
        for model in config.get_models():
            try:
                model_count += model._default_manager.count()
            except Exception:
                continue
        if model_count:
            app_counts.append({
                'label': config.verbose_name.title(),
                'count': model_count,
            })
            total_records += model_count

    app_counts.sort(key=lambda item: item['count'], reverse=True)
    recent_actions = list(
        LogEntry.objects.values('action_flag')
        .annotate(total=Count('id'))
        .order_by('action_flag')
    )
    action_counts = {str(item['action_flag']): item['total'] for item in recent_actions}

    return {
        'admin_metrics': {
            'app_counts': app_counts,
            'total_records': total_records,
            'action_counts': action_counts,
        },
    }
