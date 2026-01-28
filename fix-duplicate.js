const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'templates.ts');

const content = fs.readFileSync(filePath, 'utf-8');
const lines = content.split('\n');

console.log(`Total lines: ${lines.length}`);

let firstDrawerStart = -1;
let firstDrawerEnd = -1;
let secondDrawerStart = -1;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('drawer: `"use client"')) {
        if (firstDrawerStart === -1) {
            firstDrawerStart = i;
            console.log(`Found first drawer at line ${i + 1}`);
        } else if (secondDrawerStart === -1) {
            secondDrawerStart = i;
            console.log(`Found second drawer at line ${i + 1}`);
            break;
        }
    }
}

if (firstDrawerStart !== -1) {
    for (let i = firstDrawerStart; i < Math.min(firstDrawerStart + 100, lines.length); i++) {
        if (lines[i].includes('export { Drawer, DrawerPortal, DrawerOverlay, DrawerTrigger, DrawerClose, DrawerContent')) {
            for (let j = i; j < Math.min(i + 5, lines.length); j++) {
                if (lines[j].includes('`,')) {
                    firstDrawerEnd = j + 1;
                    console.log(`Found end of first drawer at line ${j + 1}`);
                    break;
                }
            }
            break;
        }
    }
}

if (firstDrawerStart !== -1 && firstDrawerEnd !== -1) {
    console.log(`\nRemoving lines ${firstDrawerStart + 1} to ${firstDrawerEnd}`);

    const newLines = [
        ...lines.slice(0, firstDrawerStart),
        ...lines.slice(firstDrawerEnd)
    ];

    const newContent = newLines.join('\n');
    fs.writeFileSync(filePath, newContent, 'utf-8');

    console.log('✅ Successfully removed duplicate drawer definition!');
    console.log(`New file has ${new Lines.length} lines (removed ${firstDrawerEnd - firstDrawerStart} lines)`);
} else {
    console.log('❌ Could not locate drawer definitions');
    console.log(`firstDrawerStart: ${firstDrawerStart}, firstDrawerEnd: ${firstDrawerEnd}`);
}
