curl --request POST \
  --url https://atividade-avaliativa-iv-v2-alpha.vercel.app/users/login \
  --header 'Content-Type: application/json' \
  --data '{
    "username": "existinguser",
    "password": "wrongpassword"
}'