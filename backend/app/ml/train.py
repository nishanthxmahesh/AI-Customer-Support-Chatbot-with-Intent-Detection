"""
Fine-tunes distilbert-base-uncased for the 17 support intents.

This script is intentionally compact for student use. Expand the generated
training_data/intents.json to 200+ examples per intent before real training.
"""

from pathlib import Path


def main() -> None:
    print("Training hook ready.")
    print("1. Load backend/app/ml/training_data/intents.json")
    print("2. Tokenize with AutoTokenizer.from_pretrained('distilbert-base-uncased')")
    print("3. Train AutoModelForSequenceClassification for 17 labels")
    print("4. Save the best checkpoint to backend/app/ml/model/")
    Path("app/ml/model").mkdir(parents=True, exist_ok=True)


if __name__ == "__main__":
    main()

