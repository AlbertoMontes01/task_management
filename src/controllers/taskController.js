//MY CONTROLLERS WHEN PEOPLE CLICK
function home (req, res) {
    res.render('home') /*path of page inside of views*/
}

function index (req, res) {
    /*GET data sent*/
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM tasks', (err, tasks) => {
            if(err) {
                res.json(err)
            }
            res.render('tasks/index', {tasks}) 
        })
    })

}

function create (req, res) {
    res.render('tasks/create')
}
/* SAVE IN DB*/
function store (req, res) {
    const data = req.body;

    req.getConnection((err, conn) => {
        /*WHEN I DOING THE [data] thing, the sign of ? change by [data]*/
        conn.query('INSERT INTO tasks SET ?', [data], (err, rows) => {
            res.redirect('/tasks')
        })
    }) 
}

function destroy (req, res){
    const id = req.body.id;
    
    req.getConnection((err, conn)=> {
        conn.query('DELETE FROM tasks WHERE id = ? ', [id], (err, rows) => {
            res.redirect('/tasks') 
        })
    }) 
}

function edit(req, res) {
  const id = req.params.id;
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM tasks WHERE id= ?', [id], (err, tasks) => {
        if(err) {
            res.json(err)
        }
        res.render('tasks/edit', {tasks})
    })
})
}

function update(req, res) {
    const id = req.params.id;
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('UPDATE tasks SET ? WHERE id= ?', [data, id], (err, rows) => {
            res.redirect('/tasks')
        })
    })
}

module.exports = {

    home : home,
    index : index,
    create : create,
    store : store,
    destroy : destroy,
    edit: edit,
    update: update
}