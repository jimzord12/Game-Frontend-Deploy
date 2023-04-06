1. The Town Map Loads
2. The Player Context starts initializing
   1. Fetches Player Data
   2. Based on that, fetch card data
   3. Add Player Data from JSON to Player Context Global State
   4. From JSON create Card Instances from classCard_V2.js
   5. Based ont the "state" prop of each Cardif its true: insert it to the activeCards Array. Else to the Inventory.
   6. Add Active Card Effects to the Player Context Global State???
