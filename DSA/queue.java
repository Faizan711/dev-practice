import java.util.*;

class queue {

    ArrayList<Integer> list;

    public queue() {
        list = new ArrayList<>();
    }

    public void push(int data) {
        list.add(data);
    }

    public int peek() {
        if (list.isEmpty()) {
            return -1;
        }
        return list.get(0);
    }

    public int pop() {
        if (list.isEmpty()) {
            return -1;
        }
        int val = list.get(0);
        list.remove(0);
        return val;
    }

    public boolean isEmpty() {
        return list.size() == 0;
    }

    public static void main(String[] args) {
        queue q = new queue();
        q.push(55);
        q.push(78);
        q.push(99);
        System.out.println(q.peek());
        System.out.println(q.pop());
        System.out.println(q.peek());
    }
}
