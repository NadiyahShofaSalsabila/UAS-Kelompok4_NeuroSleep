#!/bin/sh
set -e

host="$1"
shift
cmd="$@"

echo "Waiting for MySQL at $host:3306..."

# Loop sampai bisa connect via Python
while ! python -c "import socket; s=socket.socket(); s.connect(('$host', 3306))" 2>/dev/null; do
    echo "Waiting for MySQL..."
    sleep 2
done

echo "MySQL is up - executing command"
exec $cmd