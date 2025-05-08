curl --request POST \
  --url https://atividade-avaliativa-iv-v2-alpha.vercel.app/users/register \
  --header 'Content-Type: application/json' \
  --data '{
    "username": "weakpassuser",
    "password": "123",
    "email": "weakpass@example.com"
}'