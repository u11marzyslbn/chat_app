# Chat Application

To jest zmodyfikowany projekt prostej aplikacji typu chat zrobionej w ramach warsztatów "Build the future", organizowanych przez Poland ICP HUBS Network.

## Opis aplikacji

Ta aplikacja to prosty chat zbudowany na platformie Internet Computer. Składa się z:

- **Backend**: Canister napisany w Rust, który przechowuje wiadomości czatu w pamięci
- **Frontend**: Aplikacja Vue.js, która umożliwia wysyłanie i odbieranie wiadomości
- **Mock Backend**: Lokalny serwer Node.js/Express symulujący działanie Internet Computer dla celów developmentu

### Funkcjonalności:

- Wysyłanie wiadomości czatu
- Wyświetlanie wszystkich wiadomości
- Funkcja powitania
- Trwałe przechowywanie wiadomości podczas sesji

---

# `chat_app`

## Uruchamianie projektu lokalnie

### Opcja 1: Z Mock Backend (Zalecane dla deweloperów)

1. **Uruchom serwer mock backend:**

```bash
node mock-backend.js
```

2. **Uruchom serwer deweloperski frontend:**

```bash
npm start
```

Aplikacja będzie dostępna pod adresem `http://localhost:3001` z backendem działającym na `http://localhost:4943`.

### Opcja 2: Z Internet Computer (Pełna konfiguracja IC)

Jeśli chcesz przetestować swój projekt z pełną konfiguracją IC, możesz użyć następujących poleceń:

```bash
# Uruchamia replikę w tle
dfx start --background

# Wdraża canistery na replikę i generuje interfejs Candid
dfx deploy
```

Po zakończeniu zadania, Twoja aplikacja będzie dostępna pod adresem `http://localhost:4943?canisterId={asset_canister_id}`.

Jeśli wprowadziłeś zmiany w canisterze backend, możesz wygenerować nowy interfejs Candid za pomocą:

```bash
npm run generate
```

w dowolnym momencie. Jest to zalecane przed uruchomieniem serwera deweloperskiego frontend i będzie uruchamiane automatycznie za każdym razem, gdy uruchomisz `dfx deploy`.

Jeśli wprowadzasz zmiany w frontend, możesz uruchomić serwer deweloperski za pomocą:

```bash
npm start
```
