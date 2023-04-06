Creates A Player Object like this one:
{
    id,
    img, (Avatar's Image)
    name,

    // Initial Values
    inventory = []
    marketplace = []
    resources = {}
    accessToMP = false
    rank = undefined
    rankPoints = 0
    alliance = undefined

    Public Methods:
    1. craft(card)
    2. addCardToInventory(card)
    3. removeCardFromInventory(card)
    4. addCardToMarketplace(card)
    5. removeCardFromMarketplace(card)
    6. addResources(resourcesObject)
    7. remove(resourcesObject)
    8. levelUpCard(card)
    9. updateRank(newRank)
    10. addRankPoints(points)
    11. removeRankPoints(points)
    12. updateAlliance(id)
    13. enableMPAccess(boolean)

    //Getters

    1. getCurrentInventory
    2. getCurrentMarketplace
    3. getCurrentResources
    4. getCurrentRank
    5. canIaccessMP
    6. getAlliance

    Private Methods:
    1. existsIn(cardElement, array)
    2. canBeCrafted(card)


}
