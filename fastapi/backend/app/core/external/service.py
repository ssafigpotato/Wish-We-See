from openai import OpenAI
import os
from typing import Dict, Any
from .model.open_ai_llm import OpenAIClient

llm = OpenAIClient()

def classify_text(context: str, max_tokens: int = 250, temperature: float = 0.7) -> Dict[str, Any]:
    messages = [
        {"role": "system", "content": "You are a safety monitoring assistant. Your task is to analyze transcriptions of conversations to determine whether the content indicates a potential dangerous or emergency situation. Label the situation as either 'Dangerous' or 'Safe' based on the context."},
        {"role": "user", "content": f"Here is the conversation data for analysis: {context}"},
        {"role": "user", "content": "Based on the content provided, is the situation 'Dangerous' or 'Safe'? Respond with either 'Label: Dangerous' or 'Label: Safe'."}
    ]
    try:
        response = llm.classify_text(context=context)
        # response = llm.chat.completions.create(
        #     model=self.model,
        #     messages=messages,
        #     temperature=temperature,
        #     max_tokens=max_tokens,
        # )
        return response
    except Exception as e:
        print(f"알 수 없는 에러 발생: {e}")
        raise e