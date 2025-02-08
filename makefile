up:
	docker compose -f CommentApi/docker-compose-db.yml up 
run-be:
	cd CommentApi  && dotnet run
run-fe :
	cd FE_TEST  && bun run dev
	