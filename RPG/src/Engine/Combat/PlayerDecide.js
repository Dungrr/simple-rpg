var PlayerDecide = function (game, gameref, combater, speed, state)
{
    this.game = game;
    this.gameref = gameref;
    this.combater = combater;
    this.state = state;
    
    this.isReady = false;
    this.isDone = false;
    
    this.maxActions = 1;
    //
}
PlayerDecide.prototype.Update = function(elapse)
{
}
PlayerDecide.prototype.execute = function()
{
    //console.log("Player decide execute.");
    
    this.state.statemachine.inputHandler.selectPlayer(this.combater);
    //this.state.inputHandler.playerDecide = this;
    //this.state.inputHandler.showAreaForMove(this.combater);
    
    //activate player can control
    
    //if not look,
}
PlayerDecide.prototype.cleanup = function()
{
    
}

PlayerDecide.prototype.domove = function(spot)
{
    action = new CombatAction(this.game, this.gameref, this.combater, spot, "move", this.state);
    this.testEndOfTurn();
    this.state.addToActionsFront(action);
   // this.isDone = true;
}
PlayerDecide.prototype.dotouched = function(clickedObject)
{
    if(clickedObject.hostile)
    {
        var action;
        var weapon;
        //console.log(this.combater.currentSelectedWeapon);
        if(this.combater.currentSelectedWeapon)
        {
            weapon = this.combater.currentSelectedWeapon;
        }
        /*else if(this.combater.weapons.length>0)
        {
            weapon = this.combater.weapons[0];
        }*/
        if(weapon!=null)
        {
            action = new CombatAction(this.game, this.gameref, this.combater, clickedObject, "shoot", this.state,[weapon]);
            this.testEndOfTurn();
            this.state.addToActionsFront(action);
        }
    }
}
PlayerDecide.prototype.testEndOfTurn = function()
{
    this.maxActions--;
    this.state.removeTopAction();
}
PlayerDecide.prototype.endTurn = function()
{
    action = new CombatAction(this.game, this.gameref, this.combater, this.combater, "nothing", this.state,[]);
    this.state.addToActionsFront(action);
}
PlayerDecide.prototype.usePower = function(spot)
{
    if(this.combater.currentSelectedWeapon)
    {
        weapon = this.combater.currentSelectedWeapon;
    }
    if(weapon!=null)
    {
        action = new CombatAction(this.game, this.gameref, this.combater, this.combater, "useitem", this.state,[weapon]);
        this.state.addToActionsFront(action);
    }
}

