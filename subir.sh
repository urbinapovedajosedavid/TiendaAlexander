#!/bin/bash

# Mensaje personalizado o por defecto
MENSAJE=${1:-"Actualización automática desde Redmi 10"}

echo "🚀 Guardando cambios..."
git add .

echo "📝 Creando commit..."
git commit -m "$MENSAJE"

echo "⬆️ Enviando a GitHub..."
git push

echo "✅ ¡Todo guardado y sincronizado en tu repositorio de GitHub!"

