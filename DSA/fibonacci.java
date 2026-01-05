import java.util.*;

class fibonacci {

    // FOR RECURSIVE APPROACH
    // public static int fib(int n) {
    //     if (n < 2) return n;
    //     if (n == 1 || n == 0) return n;
    //     return fib(n - 1) + fib(n - 2);
    // }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter number of terms of fibonacci: ");
        int n = sc.nextInt();
        int t1 = 0,
            t2 = 1;
        if (n < 2) {
            System.out.println(
                "Number of terms should be more than or equal to 2"
            );
            return;
        }
        fibonacci f = new fibonacci();
        System.out.print("0 ");
        for (int i = 2; i <= n; i++) {
            int next = t1 + t2;
            t1 = t2;
            t2 = next;
            System.out.print(t1 + " ");
        }
        sc.close();
    }
}
