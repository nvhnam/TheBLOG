import os
import re

def remove_comments(text):
    # Regex to match strings (to avoid removing comments inside them)
    # This matches "..." or '...' and handles escaped characters
    pattern = r'("(?:\\.|[^"\\])*")|(\'(?:\\.|[^\'\\])*\')|(//.*?$)|(/\*.*?\*/)'
    
    def replacer(match):
        # If it's a string, return it as is
        if match.group(1) is not None:
            return match.group(1)
        if match.group(2) is not None:
            return match.group(2)
        # If it's a comment, return empty string
        return ""

    return re.sub(pattern, replacer, text, flags=re.MULTILINE | re.DOTALL)

def clean_java_files(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".java"):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Remove comments
                cleaned_content = remove_comments(content)
                
                # Simple unused import removal (optional, but let's try)
                # This is hard without a full parser, so maybe I'll skip it or do it carefully
                
                if cleaned_content != content:
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(cleaned_content)
                    print(f"Cleaned comments from {path}")

if __name__ == "__main__":
    clean_java_files("src/main/java")
