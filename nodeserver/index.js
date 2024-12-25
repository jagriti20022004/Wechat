// Node server which will handle socket io connections.
// const io=require('socket.io')(8000);
const{ Server}  =require('socket.io');


const PORT = process.env.PORT || 8000;

const io=new Server(8000,{
  cors:{
    origin:'*',
    methods:['GET','POST'],
  },

});

const users={};

io.on('connection',socket=>
{

  socket.on('new-user-joined',name=>
  {
    // console.log("New user",name);
    users[socket.id]=name;
    socket.broadcast.emit('user-joined',name);
  });

  socket.on('send',message=>
  {
    socket.broadcast.emit('receive',{
      message:message,
      name: users[socket.id]
    });
  });


  socket.on("disconnect", (reason) => {
   socket.broadcast.emit('left',users[socket.id]);
   delete users[socket.id];
  });


});
console.log('socket.io server running on port 8000 ');