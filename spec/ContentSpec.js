const Content = require('../modules/content/content');
const ServerContent = require('../modules/content/server-content');
const ClientContent = require('../modules/content/client-content');


function example() {
    return new Content("Lorem ipsum");
}


describe("Simple insert", function() {
    function insertedHello() {
        var e = example();
        e.updateText("LoremHello ipsum");
        return e;
    }
    it("it find the first difference", function() {
        var e = example();
        expect(e.findFirstDifference("LoremHello ipsum")).toBe(5);
    })
    
    it("inserted text was hello",function() {
        var update = insertedHello().lastUpdate();
        expect(update.text).toBe("Hello")
    })

    it("did not replace anything when inserting Hello", function() {
        var update = insertedHello().lastUpdate();
        expect(update.oldText).toBe("")
    })

    it("was able to undo", function() {
        var helloContent = insertedHello();
        helloContent.undo();
        expect(helloContent.text).toBe("Lorem ipsum");
    })
})

describe("Replace ipsum with world (check that the last word can be replaced)", function() {
    function scenario() {
        var e = example();
        e.updateText("Lorem world");
        return e;
    }

    it("it replaced the ipsum", function() {
        expect(scenario().lastUpdate().oldText).toBe("ipsum");
    }) 

    it("the new text is world", function() {
        expect(scenario().lastUpdate().text).toBe("world");
    })

    it("should be undone", function () {
        var undone = scenario();
        undone.undo();
        expect(undone.text).toBe("Lorem ipsum");
    })
    
})

describe("Replace the ipsum with Gone (check that the first word can be replaced)", function() {
    function scenario() {
        var e = example();
        e.updateText("Gone ipsum");
        return e;
    }

    it("new text is", function() {
        expect(scenario().lastUpdate().text).toBe("Gone");
    })

    it("replaced text is", function() {
        expect(scenario().lastUpdate().oldText).toBe("Lorem");
    })

    it("index should be 0", function() {
        expect(scenario().lastUpdate().index).toBe(0);
    })

    it("should be undone", function () {
        var undone = scenario();
        undone.undo();
        expect(undone.text).toBe("Lorem ipsum");
    })

    it("should be redone", function() {
        var redone = scenario();
        redone.undo();
        redone.redo();
        expect(redone.text).toBe("Gone ipsum");
    })
})

describe("redo history", function() {
    var continual = example();
    it("added norem",function() {
        continual.updateText("Lorem ipsum norem");
        expect(continual.text).toBe("Lorem ipsum norem");
    })

    it("undid", function() {
        continual.undo();
        expect(continual.text).toBe("Lorem ipsum");
    })

    it("lost ability to redo after changing text", function() {
        continual.updateText("Lorem street");
        continual.redo();
        expect(continual.text).toBe("Lorem street");
    })
})


describe("undo action" ,function() {
    it("last end string undo", function() {
        var a = new Content("hello world");
        a.updateText("hello world norem");
        a.undo();
        expect(a.text).toBe("hello world");
    })

}) 


describe("find last difference", function() {
    it("test from '' to 'hello' ", function() {
        var x = new Content("hello");
        expect(x.lastUpdate().text).toBe("hello");
    })
})

describe("duplicates", function() {
    describe("duplicate letter", function() {
        var x = new Content("x");
        x.updateText("xx");

        it("added the letter x", function() {
            expect(x.lastUpdate().text).toBe("x");
        })

        it("did not replace anything", function() {
            expect(x.lastUpdate().oldText).toBe("");
        });

        it("is able to be undone", function() {
            x.undo();
            expect(x.text).toBe("x");
        })

        it("is able to be redone", function() {
            x.redo();
            expect(x.text).toBe("xx");
        })
    })

    describe("duplicate word", function() {
        var x = new Content("hello world");
        x.updateText("hello world world");

        it("added the word world", function() {
            expect(x.lastUpdate().text).toBe(" world");
        })

        it("did not replace anything", function() {
            expect(x.lastUpdate().oldText).toBe("");
        });

        it("is able to be undone", function() {
            x.undo();
            expect(x.text).toBe("hello world");
        })

        it("is able to be redone", function() {
            x.redo();
            expect(x.text).toBe("hello world world");
        })
    })
})


describe("client and server", function() {
    var server = new ServerContent();
    
    var client = new ClientContent();

    it("", function() {
        expect().toBe();
    })
})

// describe("iterative test", function() {
    
//     var content = new Content();
//     var inserts = 0;
//     function addLetter(letter) {
//         content.updateText(content.text + letter);
        
//         inserts++;
//     }

//     addLetter("L");
//     addLetter("o");
//     addLetter("r");
//     addLetter("e");
//     addLetter("m");
//     addLetter(" ");
//     addLetter("i");
//     addLetter("i");

//     for (inserts; inserts > 1; index--) {
//         content.undo();
//     }

//     it("expect empty string", function() {
//         expect(conent.text).toBe("");
//     })
// })

