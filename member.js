function skillsMember(){
    return {
        restrict: 'E',
        templateUrl:'modules/skills/views/member.js',
        controllerAs:'vm',
        bindToController: true,
        scope:{
            member:'=',
        }
    }
}