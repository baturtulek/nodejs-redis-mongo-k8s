set -e
unset command_not_found_handle
set -o pipefail

docker build -t authserver:latest .

AUTH_NS_EXISTS=$(kubectl get ns auth | wc -l)
if [[ "$NS_EXISTS" == "0" ]]
then
	echo "Creating 'auth' namespace"
	kubectl create namespace auth
else
	echo "Auth namespace exists!"
fi

echo "Deploying MongoDB"
kubectl apply -f ./mongo/deployment.yaml
kubectl apply -f ./mongo/service.yaml

echo "Deploying Redis"
kubectl apply -f ./redis/deployment.yaml
kubectl apply -f ./redis/service.yaml

echo "Deploying Auth Server"
kubectl apply -f ./auth/deployment.yaml
kubectl apply -f ./auth/service.yaml
