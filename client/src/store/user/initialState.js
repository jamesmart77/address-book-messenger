import Immutable from 'seamless-immutable';

export default Immutable({
    currentUser: {
        id: 0,
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
        email: '',
        isPublic: false,
        createdAt: '',
        updatedAt: '',

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