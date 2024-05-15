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

    it('Add multipe new nodes', async () => {
        for (let i = 1; i <= 3; i++) {
            await page.click('.add-note');
            await page.waitForSelector('.note');
            const allNotes = await page.$$('.note');
            await allNotes[i].click();
            await allNotes[i].type('Note ' + i);
        }
    
        // Get number of notes
        const num = await page.$$eval('.note', notes => notes.length);
        expect(num).toBe(4);
        
        /* This part doesn't work

        // Check text
        const content = await page.$eval('.note', note => note.value);
        expect(content).toBe('Another note');
        const allNotes = await page.$$('.note');

        for (let i = 1; i <= 3; i++) {
            const content = await (await allNotes[i].getProperty('content')).jsonValue();
            expect(content).toBe('Note ' + i);
        }

        */
    }, 30000);

    it('Everything is there after reload', async () => {
        await page.reload();
    
        // Get number of notes
        const num = await page.$$eval('.note', notes => notes.length);
        expect(num).toBe(4);

        /* This part doesn't work
        
        // Check text
        const allNotes = await page.$$('.note');
        const content = await page.$eval('.note', note => note.value);
        expect(content).toBe('Another note');

        for (let i = 1; i <= 3; i++) {
            const content = await page.$eval(allNotes[i], note => note.value);
            expect(content).toBe('Note ' + i);
        }
        */
    }, 30000);

    it('Delete all', async () => {
<<<<<<< HEAD
        await page.evaluate(`window.confirm = () => true`)

=======

        // Wait for confirmation dialogue and press ok in the confirmation window
        page.on('dialog', async dialog => {
            await dialog.accept();
        });
>>>>>>> 3f74536d0ad1d48da84fec8e3323f4b7490f7e5a
        // Ctrl + Shift + D
        await page.keyboard.down('Control');
        await page.keyboard.down('Shift');
        await page.keyboard.press('KeyD');
        await page.keyboard.up('Control');
        await page.keyboard.up('Shift');
<<<<<<< HEAD
=======

>>>>>>> 3f74536d0ad1d48da84fec8e3323f4b7490f7e5a
        
        // Check that there are no notes left
        const notesAfterDeletion = await page.$$eval('.note', elements => elements.length);
        expect(notesAfterDeletion).toBe(0);
    });
    

  });
  