# Despliegue en VPS

## Actualizar la app

```bash
ssh root@62.171.157.89
cd /opt/apps/paulinayalfred
git pull origin main
docker stop paulinayalfred-web && docker rm paulinayalfred-web
docker build -t paulinayalfred-web .
docker run -d \
  --name paulinayalfred-web \
  --restart unless-stopped \
  --network proxy-network \
  paulinayalfred-web
```

## Si la app no responde después de actualizar

```bash
docker network connect proxy-network paulinayalfred-web
cd /opt/apps/nginx && docker compose restart
```
