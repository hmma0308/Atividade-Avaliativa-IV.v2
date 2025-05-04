curl --request POST \
  --url http://localhost:3000/users/register \
  --header 'Content-Type: application/json' \
  --data '{
    "username": "weakpassuser",
    "password": "123",
    "email": "weakpass@example.com"
}'