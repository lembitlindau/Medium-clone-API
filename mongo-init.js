db = db.getSiblingDB('medium-clone');

db.createUser({
    user: 'medium_user',
    pwd: 'medium_password',
    roles: [
        {
            role: 'readWrite',
            db: 'medium-clone'
        }
    ]
});
