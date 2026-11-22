import speech_recognition as sr
import asyncio
import edge_tts
import pygame
from langdetect import detect, LangDetectException
import time

def detect_language(text):
    """
    Detect the language of the text with prioritization for Arabic and English.
    """
    try:
        # Attempt to detect language using langdetect
        detected_lang = detect(text)
        # Check if Arabic characters are present
        if any(char in text for char in "ءابتثجحخدذرزسشصضطظعغفقكلمنهوي"):
            return 'ar'
        elif detected_lang == 'en':
            return 'en'
        else:
            return detected_lang
    except LangDetectException:
        # Fallback to character detection if langdetect fails
        if any(char in text for char in "ءابتثجحخدذرزسشصضطظعغفقكلمنهوي"):
            return 'ar'
        return 'en'

async def text_to_mp3(text, language='en', output_file="output.mp3"):
    try:
        VOICE = "ar-SA-HamedNeural" if language.lower() == 'ar' else "en-US-GuyNeural"
        tts = edge_tts.Communicate(text=text, voice=VOICE)
        await tts.save(output_file)

        pygame.mixer.init()
        pygame.mixer.music.load(output_file)
        pygame.mixer.music.play()

        while pygame.mixer.music.get_busy():
            pygame.time.Clock().tick(10)

    except Exception as e:
        print(f"Error in text-to-speech: {str(e)}")

def detect_silence(source, recognizer, silence_threshold=3):
    start_time = time.time()
    while True:
        audio = recognizer.listen(source, timeout=1, phrase_time_limit=None)
        if len(audio.frame_data) == 0:
            if time.time() - start_time >= silence_threshold:
                return True
        else:
            start_time = time.time()
        return False

def speech_to_text():
    recognizer = sr.Recognizer()
    full_text = []

    with sr.Microphone() as source:
        print("Listening... Speak now")
        recognizer.adjust_for_ambient_noise(source)

        while True:
            try:
                audio = recognizer.listen(source, timeout=5)

                text_ar = None
                text_en = None

                # Attempt recognition in both Arabic and English
                try:
                    text_ar = recognizer.recognize_google(audio, language="ar-SA")
                except sr.UnknownValueError:
                    pass

                try:
                    text_en = recognizer.recognize_google(audio, language="en-US")
                except sr.UnknownValueError:
                    pass

                # Prioritize Arabic if detected
                if text_ar and any(char in text_ar for char in "ءابتثجحخدذرزسشصضطظعغفقكلمنهوي"):
                    text = text_ar
                    print(f"Captured (Arabic): {text}")
                elif text_en:
                    text = text_en
                    print(f"Captured (English): {text}")
                elif text_ar:
                    text = text_ar
                    print(f"Captured (Arabic): {text}")
                else:
                    raise sr.UnknownValueError

                full_text.append(text)

                if detect_silence(source, recognizer):
                    complete_text = " ".join(full_text)
                    detected_language = detect_language(complete_text)
                    return complete_text, detected_language

            except sr.WaitTimeoutError:
                if full_text:
                    complete_text = " ".join(full_text)
                    detected_language = detect_language(complete_text)
                    return complete_text, detected_language
                return None, None
            except Exception as e:
                print(f"Error: {str(e)}")
                return None, None

async def main():
    while True:
        text, detected_language = speech_to_text()

        if text:
            print(f"Complete text: {text}")
            print(f"Detected language: {detected_language}")
            await text_to_mp3(text, detected_language)

        choice = input("Press Enter to speak again, or 'q' to quit: ")
        if choice.lower() == 'q':
            break

if __name__ == "__main__":
    asyncio.run(main())

