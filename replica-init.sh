#!/bin/bash
# Espera o Postgres inicializar completamente
sleep 5
echo "Ajustando recovery_min_apply_delay..."
echo "recovery_min_apply_delay = '10s'" >> /bitnami/postgresql/data/postgresql.auto.conf
