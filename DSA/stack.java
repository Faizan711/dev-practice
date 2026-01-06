import java.util.*;

class stack {

    ArrayList<Integer> list;

    public stack() {
        list = new ArrayList<>();
    }

    public void push(int data) {
        list.add(data);
    }

    public int peek() {
        if (list.isEmpty()) {
            return -1;
        }
        return list.get(list.size() - 1);
    }

    public int pop() {
        if (list.isEmpty()) {
            return -1;
        }
        int val = list.get(list.size() - 1);
        list.remove(list.size() - 1);
        return val;
    }

    public boolean isEmpty() {
        return list.size() == 0;
    }

    public static void main(String[] args) {
        stack st = new stack();
        st.push(2);
        st.push(8);
        st.push(11);
        System.out.println(st.peek());
        System.out.println(st.pop());
        System.out.println(st.peek());
    }
}
