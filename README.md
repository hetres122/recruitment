# Zadanie Rekrutacyjne

## Spis treści
- [Opis projektu](#opis-projektu)
- [API](#api)
- [Frontend](#frontend)
- [Uruchomienie Projektu](#uruchomienie-projektu)
- [Autor](#autor)

## Opis projektu

Projekt składa się z dwóch głównych części: API przygotowanego w języku Ballerina oraz komponentu w Angular, który implementuje formularz logowania, rejestracji i resetowania hasła.

## API

API zostało przygotowane w języku Ballerina i udostępnia pięć endpointów.

| Endpoint                  | Opis                                          | Metoda HTTP | Parametry ścieżki | Ciało żądania (JSON)  | Odpowiedź                |
|---------------------------|----------------------------------------------|-------------|-------------------|-----------------------|--------------------------|
| `/users`                  | Pobiera listę wszystkich użytkowników.        | GET         | Brak              | Brak                  | Lista użytkowników (JSON) |
| `/users/{id}`             | Pobiera pojedynczego użytkownika po ID.      | GET         | `{id}` - ID użytkownika | Brak               | Użytkownik (JSON)        |
| `/users`                  | Dodaje nowego użytkownika do listy użytkowników. | POST    | Brak              | Dane użytkownika (JSON) | Nowy użytkownik (JSON)    |
| `/users/resetPassword`    | Resetuje hasło użytkownika na podstawie emaila. | POST  | Brak              | Email użytkownika (JSON) | Zaakceptowane (202) lub Błąd (400) |
| `/auth/login`             | Loguje użytkownika na podstawie emaila i hasła. | POST    | Brak              | Email i hasło (JSON)   | OK (200) lub Nieautoryzowane (401) |

## Frontend

Frontend został przygotowany w Angular na bazie makiety oraz grafik tła i logotypu. Wykorzystano komponenty z biblioteki Angular Material do stworzenia formularza logowania, rejestracji i resetowania hasła.

### Logowanie

- Formularz logowania zawiera miejsce na wpisanie email, hasła, link do resetu hasła oraz przycisk do zalogowania.
- Poprawna odpowiedź wyświetla stosowną informację, a błąd 401 informuje o nieprawidłowym logowaniu.

### Rejestracja konta

- Formularz rejestracji zawiera miejsce na wpisanie email (z walidacją), hasła (z wymaganiami dotyczącymi długości i składu hasła), powtórzenie hasła oraz przycisk założenia konta.
- Po poprawnej rejestracji użytkownika, formularz przechodzi do widoku logowania.

### Reset hasła

- Formularz resetowania hasła zawiera miejsce na wpisanie email.
- Poprawna odpowiedź wyświetla informację o wysłaniu wiadomości email (obsługa wysyłki wiadomości nie jest implementowana).

## Uruchomienie Projektu

Aby uruchomić projekt, wykonaj następujące kroki:
1. Uruchom API przy użyciu Ballerina.
2. Uruchom aplikację Angular, korzystając z poleceń `ng serve`.

To wszystko! Teraz możesz przetestować funkcje logowania, rejestracji i resetowania hasła w aplikacji.

## Autor

Autor: [Patryk Kulpa]
Kontakt: [kulpapatryk02@gmail.com]



[//]: # ()
[//]: # (## Angular)

[//]: # ()
[//]: # (## Balerina)

[//]: # ()
[//]: # (### GET /users)

[//]: # ()
[//]: # (- **Description**: Pobiera listę wszystkich użytkowników.)

[//]: # (- **HTTP Method**: GET)

[//]: # (- **Response &#40;JSON&#41;**:)

[//]: # (  ```json)

[//]: # (  {)

[//]: # (  "id": "1",)

[//]: # (  "email": "user@example.com",)

[//]: # (  "password": "Password123")

[//]: # (  },)

[//]: # (  {)

[//]: # (  "id": "2",)

[//]: # (  "email": "user@example.com",)

[//]: # (  "password": "Password123")

[//]: # (  })

[//]: # ()
[//]: # (### GET /users/{id})

[//]: # ()
[//]: # (- **Description**: Pobiera pojedynczego użytkownika o określonym identyfikatorze.)

[//]: # (- **HTTP Method**: GET)

[//]: # (- **Response &#40;JSON&#41;**:)

[//]: # (  ```json)

[//]: # (    {)

[//]: # (    "id": "1",)

[//]: # (    "email": "user@example.com",)

[//]: # (    "password": "Password123")

[//]: # (    })

[//]: # ()
[//]: # (### POST /users)

[//]: # ()
[//]: # (- **Description**: Dodaje nowego użytkownika do listy użytkowników.)

[//]: # (- **HTTP Method**: POST)

[//]: # (- **Request Body &#40;JSON&#41;**:)

[//]: # (  ```json)

[//]: # (    {)

[//]: # (    "email": "new.user@example.com",)

[//]: # (    "password": "Password123")

[//]: # (    })

[//]: # (- **Response &#40;JSON&#41;**:)

[//]: # (  ```json)

[//]: # (    {)

[//]: # (    "email": "new.user@example.com",)

[//]: # (    })

[//]: # (  )
[//]: # (### POST /users/resetPassword)

[//]: # ()
[//]: # (- **Description**: Resetuje hasło użytkownika na podstawie podanego adresu e-mail.)

[//]: # (- **HTTP Method**: POST)

[//]: # (- **Request Body &#40;JSON&#41;**:)

[//]: # (  ```json)

[//]: # (    {)

[//]: # (    "email": "user@example.com",)

[//]: # (    })

[//]: # (- **Response &#40;JSON&#41;**:)

[//]: # (  ```json)

[//]: # (    {)

[//]: # (    "email": "user@example.com",)

[//]: # (    })

[//]: # ()
[//]: # (### POST /auth/login)

[//]: # ()
[//]: # (- **Description**: Loguje użytkownika na podstawie podanego adresu e-mail i hasła.)

[//]: # (- **HTTP Method**: POST)

[//]: # (- **Request Body &#40;JSON&#41;**:)

[//]: # (  ```json)

[//]: # (    {)

[//]: # (    "email": "user@example.com",)

[//]: # (    "password": "Password123")

[//]: # (    })

[//]: # (- **Response &#40;JSON&#41;**:)

[//]: # (  ```json)

[//]: # (    {)

[//]: # (    "email": "user@example.com",)

[//]: # (    })