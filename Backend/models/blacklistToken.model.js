const {DataTypes, Op} = require('sequelize');
const sequelize = require('../db/db');


const blacklistToken = sequelize.define('blacklistToken', {
    token: {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true,
        required : true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue : sequelize.literal('CURRENT_TIMESTAMP'),
        
    }
}, {
    timestamps: true,
    tableName: 'blacklist_tokens'
});

// function to automatically delete expired tokens (1-day expiration)

async function cleanExpiredTokens() {
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1); // 24 hours ago

    await blacklistToken.destroy({
        where : {
            createdAt : {
                [Op.lt] : oneDayAgo   
            }
        }
    });
}

setInterval(cleanExpiredTokens,  60 * 60 * 1000 ); // run every hour

module.exports = blacklistToken;