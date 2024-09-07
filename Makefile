dev:
	pnpm run dev

generate:
	pnpm db:generate

migrate:
	pnpm db:migrate

migrate_drop:
	pnpm drizzle-kit drop
	
lint:
	pnpm lint

build:
	pnpm build

make clean:
	rm -rf .next/