-- Rollback: Remove projetos adicionais

-- Remove associações de tecnologias
DELETE FROM projeto_tecnologias
WHERE projeto_id IN (
    SELECT id FROM projetos 
    WHERE titulo IN (
        'WideChat Extension',
        'Grav Downloader',
        'Plano A Portal',
        'Monitor de Campanha',
        'WideChat Extension 2.0',
        'WideVoice Grav Download',
        'Portfolio React',
        'Plano A - Checklist Interativo',
        'Plano A Mobile',
        'Helpdesk Plano A',
        'Plano A V2',
        'Snake Game',
        'Dashboard Demo',
        'React Flow'
    )
);

-- Remove os projetos
DELETE FROM projetos
WHERE titulo IN (
    'WideChat Extension',
    'Grav Downloader',
    'Plano A Portal',
    'Monitor de Campanha',
    'WideChat Extension 2.0',
    'WideVoice Grav Download',
    'Portfolio React',
    'Plano A - Checklist Interativo',
    'Plano A Mobile',
    'Helpdesk Plano A',
    'Plano A V2',
    'Snake Game',
    'Dashboard Demo',
    'React Flow'
);

