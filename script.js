"use strict";
// დავალება 1
// მოცემულია მასივი

// ჯავასკრიპტით გამოიტანეთ ეს ინფორმაცია ცხრილის სახით,
// თითოეულ მწკრივს (tr) ბოლოში  უნდა ჰქონდეს  ღილაკი  delete.
// Delete ღილაკზე დაჭერისას უნდა უნდა  წაიშალოს მომხმარებელი.

// ცხრილის ქვემოთ დაამატეთ add ღილაკი.

// add ღილაკზე დაჭერისას უნდა ამოვიდეს მოდალი
//  (მოდალის დიზაინისთვის შეგიძლიათ გამოიყენოთ
//  bootstrapის  მოდალის ვიზუალი)
// მოდალში უნდა იყოს ფორმა  ველებით
// ( id, email, first_name, last_name) და ორი ღილაკი add და close;
// ინფუთებში შესაძლებელი უნდა იყოს ცვლილებების შეტანა;
// add ღილაკზე დაჭერისას  ფორმა უნდა დასაბმითდეს და ცხრილში
//  push მეთოდით უნდა დაამატოთ ახალი მომხმარებელი;
// დასაბმითებისას დაამატეთ ყველა ველს ვალიდაცია,
//  თუ რომელიმე ცარიელი იქნება ფორმა არ უნდა დასაბმითდეს;
// ფორმის დასაბმითებისას დახურეთ მოდალი;
// closeზე დაჭერიას უნდა დახუროთ მოდალი.
const tableBody = document.getElementById("tableBody");
const addModalPg = document.getElementById("modalAdd");
const addUser = document.getElementById("add");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

const form = document.getElementById("modalForm");
const closeBtn = document.getElementById("close");

const users = [
  {
    id: 7,
    email: "michael.lawson@reqres.in",
    first_name: "Michael",
    last_name: "Lawson",
  },
  {
    id: 8,
    email: "lindsay.ferguson@reqres.in",
    first_name: "Lindsay",
    last_name: "Ferguson",
  },
  {
    id: 9,
    email: "tobias.funke@reqres.in",
    first_name: "Tobias",
    last_name: "Funke",
  },
  {
    id: 10,
    email: "byron.fields@reqres.in",
    first_name: "Byron",
    last_name: "Fields",
  },
  {
    id: 11,
    email: "george.edwards@reqres.in",
    first_name: "George",
    last_name: "Edwards",
  },
  {
    id: 12,
    email: "rachel.howell@reqres.in",
    first_name: "Rachel",
    last_name: "Howell",
  },
];

users.forEach((e) => {
  const deleteBtn = document.createElement("button");
  const tableRow = document.createElement("tr");
  deleteBtn.textContent = "delete";
  tableBody.appendChild(tableRow);
  tableRow.innerHTML += `<td>${e.first_name}</td>
                           <td>${e.last_name}</td>
                           <td>${e.email}</td>
                           `;
  tableRow.append(deleteBtn);
  deleteBtn.addEventListener("click", () => {
    tableRow.remove();
  });
});

const Success = function (text) {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  users.push(text);
};

const text = document.getElementById("text");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const validateNames = (names) => {
    return String(names).match(/^[a-z ,.'-]+$/i);
  };

  const formValues = document.forms.modalForm;
  try {
    if (formValues.id.value === "" || formValues.id.value.length !== 11) {
      throw new Error("Invalid ID");
    }
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    if (!validateEmail(formValues.email.value)) {
      throw new Error("Invalid Email");
    }
    if (!validateNames(formValues.firstName.value)) {
      throw new Error("Invalid Name");
    }
    if (!validateNames(formValues.lastName.value)) {
      throw new Error("Invalid Last Name");
    }
    const data = {
      id: formValues.id.value,
      email: formValues.email.value,
      first_name: formValues.firstName.value,
      last_name: formValues.lastName.value,
    };
    Success(data);
    form.reset();
  } catch (err) {
    text.textContent = err.message;
    text.style.color = "red";
  }
});

addModalPg.addEventListener("click", () => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});
closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});
