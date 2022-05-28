import { supabase } from 'utils/supabaseClient';

export const signUp = async (email, password) => {
    try {
        const { user, session } = await supabase.auth.signUp({email,password})
    } catch(error) {
        console.log(error);
    }
}

export const signIn = async (email, password) => {
    try {
        const { user, session } = await supabase.auth.signIn({email,password})
    } catch(error) {
        console.log(error);
    }
}

export const signOut = async () => {
    const { error } = await supabase.auth.signOut()
}

export const fetchUsers = async () => {
    try {
        let { data: users } = await supabase
        .from('users')
        .select('*')
        return users
    } catch(error) {
        console.log(error);
    }
}

export const createTable = async (id, title, created_by, team, id_to_render) => {
    try {
        let { data } = await supabase
        .from('tables')
        .insert([
        { id, title, created_by, team, id_to_render}
        ])
        return data
    } catch(error) {
        console.log(error);
    }
}

export const deleteTable = async (table_id) => {
    try {
        const { data, error } = await supabase
            .from('tables')
            .delete()
            .match({ id: table_id })
        return data
    } catch(error) {
        console.log(error);
    }
}

export const fetchAllTable = async () => {
    try {
        let { data: tables } = await supabase
        .from('tables')
        .select('*')
        return tables
    } catch(error) {
        console.log(error);
    }
}

export const fetchOneTable = async (id) => {
    try {
        let { data: tables } = await supabase
        .from('tables')
        .select('*')
        .eq('id', id)
        return tables
    } catch(error) {
        console.log(error);
    }
}

export const updateTable = async (id, newTitle) => {
    try {
        let { data } = await supabase
        .from('tables')
        .update({ title: newTitle })
        .eq('id', id)
        return data
    } catch(error) {
        console.log(error);
    }
}

export const fetchTodos = async (table_id) => {
    try {
        let { data: todo_item } = await supabase
            .from('todo_item')
            .select('*')
            .eq('table_id', table_id)
        return todo_item
    } catch(error) {
        console.log(error);
    }
}

export const fetchOneTodo = async (todo_id) => {
    try {
        let { data: todo_item } = await supabase
            .from('todo_item')
            .select('*')
            .eq('id', todo_id)
        return todo_item
    } catch(error) {
        console.log(error);
    }
}

export const updateTodo = async (todo_id, newColor) => {
    try {
        let { data} = await supabase
            .from('todo_item')
            .update({ color: newColor })
            .eq('id', todo_id)
        return data
    } catch(error) {
        console.log(error);
    }
}

export const updateTodoComplete = async (todo_id, newState) => {
    try {
        let { data} = await supabase
            .from('todo_item')
            .update({ complete: newState })
            .eq('id', todo_id)
        return data
    } catch(error) {
        console.log(error);
    }
}

export const updateTodoExecutors = async (todo_id, newExecutors) => {
    try {
        let { data} = await supabase
            .from('todo_item')
            .update({ executors: newExecutors })
            .eq('id', todo_id)
        return data
    } catch(error) {
        console.log(error);
    }
}

export const addTodo = async (newTodo) => {
    try {
        let { data } = await supabase
        .from('todo_item')
        .insert([
        { 
            id: newTodo.id,
            title: newTodo.content, 
            created_by_id: newTodo.created_by_id, 
            created_by_email: newTodo.created_by_email,
            color: newTodo.color,
            complete: newTodo.complete,
            table_id: newTodo.table_id,
            // inserted_at: newTodo.inserted_at,
        }
        ])
        return data
    } catch(error) {
        console.log(error);
    }
}

export const deleteTodo = async (todo_id) => {
    try {
        const { data } = await supabase
            .from('todo_item')
            .delete()
            .match({ id: todo_id })
        return data
    } catch(error) {
        console.log(error);
    }
}

export const deleteTodoByTableId = async (table_id) => {
    try {
        const { data } = await supabase
            .from('todo_item')
            .delete()
            .match({ table_id: table_id })
        return data
    } catch(error) {
        console.log(error);
    }
}

export const createTeam = async (newTeam) => {
    console.log(newTeam)
    try {
        let { data } = await supabase
            .from('teams')
            .insert([
              { 
                id: newTeam.id, 
                title: newTeam.title, 
                created_by_id: newTeam.created_by_id,
                created_by_email: newTeam.created_by_email,
                members: newTeam.members
            },
            ])
        return data
    } catch(error) {
        console.log(error);
    }
}

export const fetchAllTeams = async () => {
    try {
        let { data: teams } = await supabase
        .from('teams')
        .select('*')
        return teams
    } catch(error) {
        console.log(error);
    }
}

export const fetchOneTeam = async (teamId) => {
    try {
        let { data: teams } = await supabase
        .from('teams')
        .select('*')
        .eq('id', teamId)
        return teams
    } catch(error) {
        console.log(error);
    }
}

export const fetchTeamsByCreator = async (userId) => {
    try {
        let { data: teams } = await supabase
        .from('teams')
        .select('*')
        .eq('created_by_id', userId)
        return teams
    } catch(error) {
        console.log(error);
    }
}

export const updateTeam = async (team_id, newProjects) => {
    try {
        let { data} = await supabase
            .from('teams')
            .update({ projects: newProjects })
            .eq('id', team_id)
        return data
    } catch(error) {
        console.log(error);
    }
}

export const addMessage = async (title, created_by, table_id, created_by_email, todo_id) => {
    try {
        const randomId = len => Math.random().toString(36).substr(3, len);
        const id = randomId(15);
        let { data} = await supabase
            .from('message')
            .insert([
            { id, title, created_by, table_id, created_by_email, todo_id},
            ])
        return data
    } catch(error) {
        console.log(error);
    }
}

export const fetchMessage = async (table_id) => {
    try {
        let { data: message } = await supabase
        .from('message')
        .select('*')
        .eq('table_id', table_id)
        return message
    } catch(error) {
        console.log(error);
    }
}

export const deleteMessageByTableId = async (table_id) => {
    try {
        const { data, error } = await supabase
            .from('message')
            .delete()
            .match({ table_id: table_id })
        return data
    } catch(error) {
        console.log(error);
    }
}