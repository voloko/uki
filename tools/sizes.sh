wget -q http://0.0.0.0:8000/src/uki-core.js?squeeze=1
wget -q http://0.0.0.0:8000/src/uki.js?squeeze=1
gzip uki-core.js\?squeeze\=1
gzip uki.js\?squeeze\=1
ls -la | grep squeeze
rm uki-core.js\?squeeze\=1.gz
rm uki.js\?squeeze\=1.gz
