import re

# Read the file
with open(r'c:\Users\youne\OneDrive\Desktop\sekerbura\src\templates.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Split by lines and find the duplicate drawer sections
lines = content.split('\n')

# Find line indices for both drawer definitions
first_drawer_start = None
first_drawer_end = None
second_drawer_start = None

for i, line in enumerate(lines):
    if 'drawer: `"use client"' in line and first_drawer_start is None:
        first_drawer_start = i
    elif 'drawer: `"use client"' in line and first_drawer_start is not None:
        second_drawer_start = i
        break

# Find the end of first drawer (look for export { Drawer...)
if first_drawer_start:
    for i in range(first_drawer_start, min(first_drawer_start + 100, len(lines))):
        if 'export { Drawer, DrawerPortal, DrawerOverlay, DrawerTrigger, DrawerClose, DrawerContent' in lines[i]:
            first_drawer_end = i + 2  # Include the `, line after export
            break

print(f"First drawer: lines {first_drawer_start} to {first_drawer_end}")
print(f"Second drawer starts at: line {second_drawer_start}")

if first_drawer_start and first_drawer_end:
    # Remove the first drawer definition
    new_lines = lines[:first_drawer_start] + lines[first_drawer_end:]
    new_content = '\n'.join(new_lines)
    
    # Write back
    with open(r'c:\Users\youne\OneDrive\Desktop\sekerbura\src\templates.ts', 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("✅ Successfully removed duplicate drawer definition!")
    print(f"Removed lines {first_drawer_start} to {first_drawer_end}")
else:
    print("❌ Could not find drawer definitions to remove")
