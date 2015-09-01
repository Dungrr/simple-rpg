StateMachine = function (game) {
    this.mStates = [];//associative
    this.mCurrentState = null;
}
StateMachine.prototype.update = function(elapsedTime) 
{
    if(this.mCurrentState!=undefined)
        this.mCurrentState.update(elapsedTime);
}
StateMachine.prototype.render = function() 
{
    if(this.mCurrentState!=undefined)
        this.mCurrentState.render();
}
StateMachine.prototype.change = function(stateName, params) 
{
    var newState = this.mStates[stateName];
    if(newState==null)
        return;
    
    if(this.mCurrentState!=undefined)
        this.mCurrentState.onExit();
    
    this.mCurrentState = newState;
    this.mCurrentState.onEnter(params);
}
StateMachine.prototype.add = function(name, state) 
{
    this.mStates[name] = state;
}