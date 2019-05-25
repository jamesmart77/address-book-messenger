import Immutable from 'seamless-immutable';

export default Immutable({
    currentUser: {
        id: 0,
        firstName: '',
        lastName: '',
        phone: ''
    },
    initialLoad: true,
    allUsers: [
        {
            id: 0,
            firstName: '',
            lastName: '',
            phone:''
        }
    ]
})