from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

OLLAMA_URL = "http://localhost:11434/api/chat"  # Ollama local endpoint
OLLAMA_MODEL = "mistral"  # or "llama2", "gemma", etc.

@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()
    prompt = data.get("prompt", "")
    mode = data.get("mode", "Story")

    full_prompt = format_prompt(prompt, mode)

    try:
        response = requests.post(
            OLLAMA_URL,
            json={
                "model": OLLAMA_MODEL,
                "messages": [{"role": "user", "content": full_prompt}]
            },
            stream=True  # <-- Add this
        )

        # Read the last line of the stream (the final response)
        output_text = ""
        for line in response.iter_lines():
            if line:
                result = line.decode('utf-8')
                print("Ollama response line:", result)  # Add this line
                try:
                    data = json.loads(result)
                    if "message" in data and "content" in data["message"]:
                        output_text += data["message"]["content"]
                except Exception as e:
                    print("JSON decode error:", e)

        return jsonify({"output": output_text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

def format_prompt(prompt, mode):
    if mode == "Story":
        return f"Write a creative short story based on the following prompt:\n\n{prompt}"
    elif mode == "Song":
        return f"Write a song with verses and chorus about:\n\n{prompt}"
    elif mode == "Essay":
        return f"Write an essay on the topic:\n\n{prompt}"
    else:
        return f"Write something based on:\n\n{prompt}"

if __name__ == "__main__":
    app.run(debug=True)
