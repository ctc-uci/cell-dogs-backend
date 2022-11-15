// const express = require('express');

user.get('/user', async (req, res) => {
    try
    {
        const allUserInfo = await pool.query("select * from User");
        res.send(allUserInfo.rows);
    }
    catch (err)
    {
        res.status(400).send(err.message);
    }
});

user.get('/user/:email', async (req, res) => {
    try
    {
        const { email } = req.params;
        const userInfo = await pool.query(`select * from User where email = ${email}`);
        res.send(userInfo.rows);
    }
    catch (err)
    {
        res.status(400).send(err.message);
    }
});

user.post('/user', async (req, res) => {
    try
    {
        const { id, email, firstName, lastName, facility} = req.body;
        const newUser = await pool.query(`insert into User (id, email, firstName, lastName, facility) values (${id}, ${email}, ${firstName}, ${lastName}, ${facility}) returning *`);
        res.send(newUser.rows);
    }
    catch
    {
        res.status(400).send(err.message);
    }
});

user.delete('/user/:email', async (req, res) => {
    try
    {
        const { email } = req.params;
        await pool.query(`delete from User where email = ${email}}`);
        res.send(`User with id ${id} was deleted.`);
    }
    catch
    {
        res.status(400).send(err.message);
    }
});

user.put('/user/:email', async (req, res) => {
    try
    {
        const data = req.body;
        const { email } = req.params;


        // data.map((element) => {
        //     if (element)
        //     {

        //     }
        // })
        
        const id = req.body.id;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const facility = req.body.facility;
        const newEmail = req.body.email;
        if (id != '')
        {
            await pool.query(`update User set id = ${id} where email = ${email}`);
        }

        if (firstName != '')
        {
            
        }
        
    }
    catch
    {
        res.status(400).send(err.message);
    }
})

module.exports = userRouter;