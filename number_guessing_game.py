import random


def get_difficulty():
    """Let the player pick a difficulty and return the max number."""
    print("\nChoose a difficulty:")
    print("  1. Easy   (1 - 50)")
    print("  2. Medium (1 - 100)")
    print("  3. Hard   (1 - 500)")

    while True:
        choice = input("Enter 1, 2, or 3: ").strip()
        if choice == "1":
            return 50
        elif choice == "2":
            return 100
        elif choice == "3":
            return 500
        else:
            print("Invalid choice. Try again.")


def get_guess():
    """Ask for a guess and keep asking until it's a valid number."""
    while True:
        try:
            return int(input("Your guess: "))
        except ValueError:
            print("That's not a whole number. Try again.")


def play_game():
    """Run one full round of the game."""
    max_number = get_difficulty()
    secret = random.randint(1, max_number)
    attempts = 0

    print(f"\nI'm thinking of a number between 1 and {max_number}.")
    print("Can you guess it?\n")

    while True:
        guess = get_guess()
        attempts += 1

        if guess < secret:
            print("Too low! ⬆️")
        elif guess > secret:
            print("Too high! ⬇️")
        else:
            print(f"\n🎉 Correct! You got it in {attempts} attempt(s).")
            break


def main():
    """Entry point: greet, play rounds, ask to replay."""
    print("=" * 30)
    print("   NUMBER GUESSING GAME")
    print("=" * 30)

    while True:
        play_game()
        again = input("\nPlay again? (yes/no): ").strip().lower()
        if again not in ("yes", "y"):
            break

    print("\nThanks for playing! Goodbye. 👋")


# This makes main() run only when the file is executed directly.
if __name__ == "__main__":
    main()
