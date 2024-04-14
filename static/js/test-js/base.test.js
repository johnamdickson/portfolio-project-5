/**
 * @jest-environment jsdom
 */

/*jshint esversion: 6 */ 

// all code below from my pp4 automated testing.
// https://github.com/johnamdickson/portfolio-project-4/blob/main/static/js/test-js/script.test.js

const errorCountdown= require("../base");

describe("400 DOM tests", () => {

    beforeAll(() => {
        let fs = require("fs");
        let fileContents = fs.readFileSync("templates/400.html", "utf-8");
        document.write(fileContents);
        document.close();
        // use of fake timers to test errorCountdown function:
        // https://jestjs.io/docs/next/timer-mocks
        jest.useFakeTimers();
        errorCountdown();
    });

    test("Expects timer to be set at 60 seconds on page load", () => {
        expect(document.getElementById("error-timer")
            .innerText).toEqual("60");
    });
    test("Expects timer to be set at 30 seconds after 30 seconds", async () => {
        jest.advanceTimersByTime(30000);
        expect(document.getElementById("error-timer")
            .innerText).toEqual("30");
    });
    test("Expects timer to be set at 0 seconds after 60 seconds", async () => {
        jest.advanceTimersByTime(60000);
        expect(document.getElementById("error-timer")
            .innerText).toEqual("0");
    });
    test("h2 should exist", () => {
        expect(document.getElementsByTagName("h2").length).toBe(1);
    });
    test("h2 should be 500 error", () => {
        let h2 = document.getElementsByTagName('h2');
        let h2Text = h2[0].innerHTML;
        expect(h2Text).toBe("400 Error");
    });
    test("h3 should exist", () => {
        expect(document.getElementsByTagName("h3").length).toBe(1);
    });
    test("h3 should be Internal Server Error", () => {
        let h3 = document.getElementsByTagName('h3');
        let h3Text = h3[0].innerHTML;
        expect(h3Text).toBe("Bad Request");
    });
});


describe("403 DOM tests", () => {

    beforeAll(() => {
        let fs = require("fs");
        let fileContents = fs.readFileSync("templates/403.html", "utf-8");
        document.write(fileContents);
        document.close();
        // use of fake timers to test errorCountdown function:
        // https://jestjs.io/docs/next/timer-mocks
        jest.useFakeTimers();
        errorCountdown();
    });

    test("Expects timer to be set at 10 seconds on page load", () => {
        expect(document.getElementById("error-timer")
            .innerHTML).toEqual("10");
    });
    test("Expects timer to be set at 5 seconds after 5 seconds", async () => {
       
        jest.advanceTimersByTime(5000);
        expect(document.getElementById("error-timer")
            .innerText).toEqual("5");
    });
    test("Expects timer to be set at 0 seconds after 10 seconds", async () => {
        jest.advanceTimersByTime(10000);
        expect(document.getElementById("error-timer")
            .innerText).toEqual("0");
    });
    test("h2 should exist", () => {
        expect(document.getElementsByTagName("h2").length).toBe(1);
    });
    test("h2 should be 403 error", () => {
        let h2 = document.getElementsByTagName('h2');
        let h2Text = h2[0].innerHTML;
        expect(h2Text).toBe("403 Error");
    });
    test("h3 should exist", () => {
        expect(document.getElementsByTagName("h3").length).toBe(1);
    });
    test("h3 should be Forbidden", () => {
        let h3 = document.getElementsByTagName('h3');
        let h3Text = h3[0].innerHTML;
        expect(h3Text).toBe("Forbidden");
    });
});

describe("404 DOM tests", () => {

    beforeAll(() => {
        let fs = require("fs");
        let fileContents = fs.readFileSync("templates/404.html", "utf-8");
        document.write(fileContents);
        document.close();
        // use of fake timers to test errorCountdown function:
        // https://jestjs.io/docs/next/timer-mocks
        jest.useFakeTimers();
        errorCountdown();
    });

    test("Expects timer to be set at 10 seconds on page load", () => {
        expect(document.getElementById("error-timer")
            .innerHTML).toEqual("10");
    });
    test("Expects timer to be set at 5 seconds after 5 seconds", async () => {
       
        jest.advanceTimersByTime(5000);
        expect(document.getElementById("error-timer")
            .innerText).toEqual("5");
    });
    test("Expects timer to be set at 0 seconds after 10 seconds", async () => {
        jest.advanceTimersByTime(10000);
        expect(document.getElementById("error-timer")
            .innerText).toEqual("0");
    });
    test("h2 should exist", () => {
        expect(document.getElementsByTagName("h2").length).toBe(1);
    });
    test("h2 should be 403 error", () => {
        let h2 = document.getElementsByTagName('h2');
        let h2Text = h2[0].innerHTML;
        expect(h2Text).toBe("404 Error");
    });
    test("h3 should exist", () => {
        expect(document.getElementsByTagName("h3").length).toBe(1);
    });
    test("h3 should be Forbidden", () => {
        let h3 = document.getElementsByTagName('h3');
        let h3Text = h3[0].innerHTML;
        expect(h3Text).toBe("This page does not exist.");
    });
});


describe("500 DOM tests", () => {

    beforeAll(() => {
        let fs = require("fs");
        let fileContents = fs.readFileSync("templates/500.html", "utf-8");
        document.write(fileContents);
        document.close();
        // use of fake timers to test errorCountdown function:
        // https://jestjs.io/docs/next/timer-mocks
        jest.useFakeTimers();
        errorCountdown();
    });

    test("Expects timer to be set at 60 seconds on page load", () => {
        expect(document.getElementById("error-timer")
            .innerText).toEqual("60");
    });
    test("Expects timer to be set at 30 seconds after 30 seconds", async () => {
        jest.advanceTimersByTime(30000);
        expect(document.getElementById("error-timer")
            .innerText).toEqual("30");
    });
    test("Expects timer to be set at 0 seconds after 60 seconds", async () => {
        jest.advanceTimersByTime(60000);
        expect(document.getElementById("error-timer")
            .innerText).toEqual("0");
    });
    test("h2 should exist", () => {
        expect(document.getElementsByTagName("h2").length).toBe(1);
    });
    test("h2 should be 500 error", () => {
        let h2 = document.getElementsByTagName('h2');
        let h2Text = h2[0].innerHTML;
        expect(h2Text).toBe("500 Error");
    });
    test("h3 should exist", () => {
        expect(document.getElementsByTagName("h3").length).toBe(1);
    });
    test("h3 should be Internal Server Error", () => {
        let h3 = document.getElementsByTagName('h3');
        let h3Text = h3[0].innerHTML;
        expect(h3Text).toBe("Internal Server Error");
    });
});