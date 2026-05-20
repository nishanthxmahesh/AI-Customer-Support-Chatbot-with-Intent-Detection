from app.models.intent import INTENT_COLORS


def main() -> None:
    print("Seed data preview")
    print("Users: 6 demo users")
    print(f"Intent examples: {len(INTENT_COLORS) * 200}+ generated examples")
    print("Templates: 40, KB articles: 25, Historical sessions: 500")
    print("For MongoDB production seeding, replace these prints with insert_many calls using Motor.")


if __name__ == "__main__":
    main()
