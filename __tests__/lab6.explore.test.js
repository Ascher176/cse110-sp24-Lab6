describe('Basic user flow for Website', () => {
    // First, visit the web app
    beforeAll(async () => {
        await page.goto('https://ascher176.github.io/cse110-sp24-Lab6/');
    });

    it('Add a new note', async () => {
        // Click and wait for note to appear
        await page.click('.add-note');
        await page.waitForSelector('.note');
    
        // Get number of notes
        const num = await page.$$eval('.note', notes => notes.length);
        expect(num).toBe(1);
    });

    it('Empty note says "New Note"', async () => {
        const empContent = await page.$eval('.note', note => note.placeholder);
        expect(empContent).toBe('New Note');
    });

    it('Type into empty note', async () => {
        // Click and wait for note to appear
        await page.click('.note');
        await page.waitForSelector('.note');
    
        // Type
        await page.type('.note', 'Hello!');
    
        // See if content was updated
        const content = await page.$eval('.note', note => note.value);
        expect(content).toBe('Hello!');
    });

    it('Update note', async () => {
        // Click and wait for note to appear
        await page.click('.note');
        await page.waitForSelector('.note');
    
        // Erase and type after
        await page.keyboard.press('Backspace');
        await page.type('.note', ' world!');
    
        // See if content was updated
        const content = await page.$eval('.note', note => note.value);
        expect(content).toBe('Hello world!');
    });

    it('Add a second note', async () => {
        // Click and wait for note to appear
        await page.click('.add-note');
        await page.waitForSelector('.note');

        const allNotes = await page.$$('.note');

        await allNotes[1].click();
        await allNotes[1].type('Another note');
    
        // Get number of notes
        const num = await page.$$eval('.note', notes => notes.length);
        expect(num).toBe(2);
    });

    it('Delete the first note', async () => {
        // Double click to delete
        const firstNote = await page.$('.note');
        await firstNote.click({ clickCount: 2 });
    
        // Verify that the note is deleted
        const notesAfterDeletion = await page.$$eval('.note', elements => elements.length);
        expect(notesAfterDeletion).toBe(1);
    });

    it('Add multipe new notes', async () => {
        for (let i = 1; i <= 3; i++) {
            await page.click('.add-note');
            await page.waitForSelector('.note');
            const allNotes = await page.$$('.note');
            await allNotes[i].click();
            await allNotes[i].type('Note ' + i);
        }
        await page.mouse.click(1, 1);
    
        // Get number of notes
        const num = await page.$$eval('.note', notes => notes.length);
        expect(num).toBe(4);

        // Check the text

        //get an array of elements with class note
        const notes = await page.$$('.note');
        //create empty array so we can push the strings into
        const text = [];

        //Iterate over each note and extract the string from the text area in the notes.
        for (let note in notes){
            //getting note from the array
            const noteCurrent = notes[note];
            //getting the value handle through getProperty
            const valHandle = await noteCurrent.getProperty('value');
            //Getting the value from the handle using jsonValue
            const val = await valHandle.jsonValue();
            //adding the value ("string") to the text array
            text.push(val);
        }

        //testing all the strings if they are all there.
        expect(text[0]).toBe('Another note');
        expect(text[1]).toBe('Note 1');
        expect(text[2]).toBe('Note 2');
        expect(text[3]).toBe('Note 3');
    }, 30000);

    it('Everything is there after reload', async () => {
        await page.reload();
    
        // Get number of notes
        const num = await page.$$eval('.note', notes => notes.length);
        expect(num).toBe(4);

        // Check the text

        //get an array of elements with class note
        const notes = await page.$$('.note');
        //create empty array so we can push the strings into
        const text = [];

        //Iterate over each note and extract the string from the text area in the notes.
        for (let note in notes){
            //getting note from the array
            const noteCurrent = notes[note];
            //getting the value handle through getProperty
            const valHandle = await noteCurrent.getProperty('value');
            //Getting the value from the handle using jsonValue
            const val = await valHandle.jsonValue();
            //adding the value ("string") to the text array
            text.push(val);
        }

        //testing all the strings if they are all there.
        expect(text[0]).toBe('Another note');
        expect(text[1]).toBe('Note 1');
        expect(text[2]).toBe('Note 2');
        expect(text[3]).toBe('Note 3');
    }, 30000);

    it('Delete all', async () => {

        // Wait for confirmation dialogue and press ok in the confirmation window
        page.on('dialog', async dialog => {
            await dialog.accept();
        });
        // Ctrl + Shift + D
        await page.keyboard.down('Control');
        await page.keyboard.down('Shift');
        await page.keyboard.press('KeyD');
        await page.keyboard.up('Control');
        await page.keyboard.up('Shift');

        
        // Check that there are no notes left
        const notesAfterDeletion = await page.$$eval('.note', elements => elements.length);
        expect(notesAfterDeletion).toBe(0);
    });
    

  });
  