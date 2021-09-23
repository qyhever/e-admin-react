dist_path="dist"
server_name="charon"
server_static_dic="/usr/local/src/nginx-1.12.2/html"
scp -r $dist_path $server_name:$server_static_dic