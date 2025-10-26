import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  updateDoc, 
  doc, 
  onSnapshot,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Plus, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insertTodoSchema, type InsertTodo, type Todo } from '@shared/schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{ title: string; message: string } | null>(null);
  const { toast } = useToast();
  
  const form = useForm<InsertTodo>({
    resolver: zodResolver(insertTodoSchema),
    defaultValues: {
      text: '',
      completed: false,
      timestamp: 0,
    },
  });

  // Real-time listener for todos from Firestore
  useEffect(() => {
    const q = query(collection(db, 'todos'), orderBy('timestamp', 'desc'));
    
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const todosData: Todo[] = snapshot.docs.map(doc => ({
          id: doc.id,
          text: doc.data().text,
          completed: doc.data().completed,
          timestamp: doc.data().timestamp,
        }));
        setTodos(todosData);
        setError(null); // Clear any previous errors
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching todos:', err);
        
        // Set persistent error state
        if (err.code === 'permission-denied') {
          setError({
            title: 'Firebase Setup Required',
            message: 'Please configure Firestore security rules in your Firebase console. Go to Firestore Database > Rules and add: allow read, write: if true; (for development)',
          });
        } else {
          setError({
            title: 'Connection Error',
            message: 'Failed to connect to Firebase. Please check your internet connection and Firebase configuration.',
          });
        }
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Add new todo to Firestore
  const onSubmit = async (data: InsertTodo) => {
    try {
      await addDoc(collection(db, 'todos'), {
        text: data.text,
        completed: false,
        timestamp: Timestamp.now().toMillis(),
      });
      
      form.reset();
      toast({
        title: 'Success',
        description: 'Task added successfully!',
      });
    } catch (err) {
      console.error('Error adding todo:', err);
      toast({
        title: 'Error',
        description: 'Failed to add task. Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Toggle todo completion status
  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      const todoRef = doc(db, 'todos', id);
      await updateDoc(todoRef, {
        completed: !completed,
      });
    } catch (error) {
      console.error('Error updating todo:', error);
      toast({
        title: 'Error',
        description: 'Failed to update task.',
        variant: 'destructive',
      });
    }
  };

  // Delete todo from Firestore
  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'todos', id));
      toast({
        title: 'Success',
        description: 'Task deleted successfully!',
      });
    } catch (error) {
      console.error('Error deleting todo:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete task.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-[500px]">
        <div className="bg-card rounded-lg shadow-lg border border-card-border p-6 sm:p-8">
          {/* Header */}
          <h1 className="text-3xl font-bold text-foreground mb-6 text-center">
            My To-Do List
          </h1>

          {/* Firebase Error Alert */}
          {error && (
            <Alert variant="destructive" className="mb-6" data-testid="error-alert">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{error.title}</AlertTitle>
              <AlertDescription className="text-sm">
                {error.message}
              </AlertDescription>
            </Alert>
          )}

          {/* Add Task Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mb-6">
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder="What needs to be done?"
                          {...field}
                          disabled={form.formState.isSubmitting || !!error}
                          data-testid="input-task"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  disabled={form.formState.isSubmitting || !!error}
                  className="min-w-[100px]"
                  data-testid="button-add"
                >
                  {form.formState.isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-1" />
                      Add Task
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12" data-testid="loading-state">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">Loading todos...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && todos.length === 0 && (
            <div className="text-center py-12" data-testid="empty-state">
              <p className="text-muted-foreground text-lg">No tasks yet!</p>
              <p className="text-muted-foreground text-sm mt-1">
                Add your first task above to get started.
              </p>
            </div>
          )}

          {/* Todo List */}
          {!loading && !error && todos.length > 0 && (
            <div className="space-y-3" data-testid="todo-list">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center gap-3 p-4 bg-accent rounded-md border border-border hover-elevate transition-all group"
                  data-testid={`todo-item-${todo.id}`}
                >
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => handleToggleComplete(todo.id, todo.completed)}
                    className="h-5 w-5 shrink-0"
                    data-testid={`checkbox-${todo.id}`}
                  />
                  
                  <span
                    className={`flex-1 text-base transition-all ${
                      todo.completed
                        ? 'line-through text-muted-foreground'
                        : 'text-foreground'
                    }`}
                    data-testid={`text-${todo.id}`}
                  >
                    {todo.text}
                  </span>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    data-testid={`button-delete-${todo.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Task Counter */}
          {!loading && !error && todos.length > 0 && (
            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground text-center" data-testid="task-counter">
                {todos.filter(t => !t.completed).length} of {todos.length} tasks remaining
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
