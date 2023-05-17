const { AuthenticationError } = require('apollo-server-express'); 
const { signToken } = require ('../utils/auth'); 
const { User } = require('../models'); 

const resolvers = { 
    
    Query: { 
        me: async (parent, context) => {
            if(context.user) { 
                return User.findOne({_id: context.user._id}).populate('savedBooks'); 
            }
            throw new AuthenticationError("You must be logged in first!")
        }
    },

    Mutation: { 
        
        addUser: async (parent, { username, email, password }) => { 

            const user = await User.create({ username, email, password}); 
            const token = signToken(user); 
            return { token, user }; 
        }, 
        login: async ( parent, { email, password }) => { 
            
            const user = await User.findOne({email})

            if(!user) { 
                throw new AuthenticationError('There is no user found with this email address!')
            }

            const verifyPw = await user.isCorrectPassword(password); 
            
            if(!verifyPw) { 
                throw new AuthenticationError('This is not the correct password, please try again!')
            }
            const token = signToken(user); 
            return { token, user }; 
        }, 
        savedBook: async ( parent, book, context ) => { 
            
            if(context.user) { 
                
                const putUser = await User.findByIdAndUpdate( 
                    {_id: context.user._id}, 
                    { $addToSet: {savedBooks: book }}, 
                    { new: true }
                ); 
                return putUser; 
            }
            throw new AuthenticationError("You must be logged in first!"); 
        }, 
        removeBook: async (parent, {bookID}, context ) => { 
            if (context.user) { 
                const pullUser = await User.findOneAndUpdate(
                    {_id: context.user._id}, 
                    { $pull: {savedBooks: {bookID}}}, 
                    {new: true}
                ); 
                return putUser; 
            }
            throw new AuthenticationError("You must be logged in first!")
        }

    }
};

module.exports = resolvers; 