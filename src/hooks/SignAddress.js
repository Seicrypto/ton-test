import { toContainElement } from "@testing-library/jest-dom/dist/matchers"

document.getElementById("connectButton", connect)

function connect() {
    ton
        .send("ton_requestAccounts")
        .then(handleAccountChanged)
        .catch((error) => {
            console.log("Please connect to Openmask.")
        });
}

const signature = await provider.send("ton_personalSign", {
    data: "Sign test",
})