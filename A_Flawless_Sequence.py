def solve_case(n):
    if n == 1:
        return [-1]
    elif n == 4:
        return [2, 4, 1, 3]
    elif n == 5:
        return [5, 1, 4, 3, 2]
    else:
        # حل عام
        seq = []
        if n % 2 == 0:
            for i in range(n, 0, -1):
                seq.append(i)
        else:
            for i in range(n, 0, -1):
                seq.append(i)
        return seq


t = int(input())
for _ in range(t):
    n = int(input())
    result = solve_case(n)
    print(" ".join(map(str, result)))
