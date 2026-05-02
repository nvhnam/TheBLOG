import os
import re

def remove_unused_imports(path):
    with open(path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    import_pattern = re.compile(r'^import\s+([\w\.]+);')
    imports = []
    other_lines = []
    
    for line in lines:
        match = import_pattern.match(line.strip())
        if match:
            imports.append((line, match.group(1)))
        else:
            other_lines.append(line)

    full_text = "".join(other_lines)
    
    # We want to keep imports if the class name is used in the text.
    # The class name is the last part of the import.
    used_imports = []
    for line, imp in imports:
        class_name = imp.split('.')[-1]
        # Check if class_name is used in the text as a word
        if re.search(r'\b' + re.escape(class_name) + r'\b', full_text):
            used_imports.append(line)
        else:
            # Special case for static imports or wildcard imports (which we should probably keep if we're not sure)
            if '*' in imp or 'static' in line:
                used_imports.append(line)
            else:
                print(f"Removing unused import {imp} from {path}")

    # Reconstruct the file
    new_lines = []
    import_inserted = False
    for line in lines:
        if import_pattern.match(line.strip()):
            if not import_inserted:
                new_lines.extend(used_imports)
                import_inserted = True
        else:
            new_lines.append(line)
            
    if "".join(new_lines) != "".join(lines):
        with open(path, 'w', encoding='utf-8') as f:
            f.write("".join(new_lines))

def clean_imports(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".java"):
                remove_unused_imports(os.path.join(root, file))

if __name__ == "__main__":
    clean_imports("src/main/java")
